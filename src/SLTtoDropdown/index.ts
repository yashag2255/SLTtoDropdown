import { IDropdownOption } from "@fluentui/react/lib/Dropdown";
import React = require("react");
import ReactDom = require("react-dom");
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { DropdownConfig } from "./DropdownSetup";

export class SLTtoDropdown implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _context: ComponentFramework.Context<IInputs>;
    private container: HTMLDivElement;
    private notifyOutputChanged: () => void;
    private options: IDropdownOption[];
    private varvalue?: string;
    private varvaluekey?: number;
    /**
     * Empty constructor.
     */
    constructor()
    {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        // Add control initialization code
        this.container = container;
        this.notifyOutputChanged = notifyOutputChanged;
        this.options = new Array();
        this._context = context;
        this.options.push({ key: -1, text: '' });
        if (context.parameters.selectedvalue.raw) {
            this.varvalue = context.parameters.selectedvalue.raw;
        }
        else {
            this.varvalue = ""
        }

        if (context.parameters.dropdowninput != null) {
            var temparray = (<string><unknown>context.parameters.dropdowninput.raw).split(";");
            for (let i = 0; i < temparray.length; i++) {
                this.options.push({ key: i + 1, text: temparray[i] });
            }
        }
        console.log(this.options);
        console.log("selectedvalue" + context.parameters.selectedvalue.raw)

        if (context.parameters.selectedvalue.raw) {
            var index: number;
            if (context.parameters.selectedvalue.type == "Whole.None") {
                index = this.options.findIndex(x => x.text === context.parameters.selectedvalue.raw.toString().trim());
            }
            else {
                index = this.options.findIndex(x => x.text.toString().trim() === context.parameters.selectedvalue.raw.toString().trim());
            }

            console.log("index" + index);
            if (index >= 0) {
                var tempobject = this.options[index];
                console.log(tempobject);
                if (tempobject.key) {
                    let currentvar: number;
                    currentvar = Number(tempobject.key);
                    this.varvaluekey = currentvar;
                }
                else {
                    this.varvaluekey = -1
                }

            }
            else {
                this.varvaluekey = -1
            }

        }
        else {
            this.varvaluekey = -1
        }

        console.log("varvalue:" + this.varvaluekey);
        this.displayControl(context, this.varvaluekey);
        this.notifyOutputChanged();
    }

    private displayControl(context: ComponentFramework.Context<IInputs>, idnumber: number | undefined) {

        console.log("render control triggered");

        let currentValueKey: number;

        if (this.varvaluekey) {
            currentValueKey = this.varvaluekey;
        }
        else {
            currentValueKey = -1
        }
        if (this.varvaluekey) {
            currentValueKey = this.varvaluekey
        }
        else {
            currentValueKey = -1
        }
        console.log(currentValueKey);
        const dropdowncontrol = React.createElement(DropdownConfig, {
            selected: currentValueKey,
            options: this.options,
            isDisabled: context.mode.isControlDisabled,
            onChange: (selectedOption?: IDropdownOption) => {
                if (typeof selectedOption === 'undefined' || selectedOption.key === -1) {
                    this.varvalue = "";
                    this.varvaluekey = undefined;
                } else {
                    this.varvalue = <string>selectedOption.text;
                    this.varvaluekey = <number>selectedOption.key;
                }

                this.notifyOutputChanged();
            }
        })
        ReactDom.render(dropdowncontrol, this.container);
    }



    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        // Add code to update control view
        console.log("Update view triggerd");
        this.displayControl(context, this.varvaluekey);
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        console.log("getoutputs triggered");
        return {
            selectedvalue: this.varvalue
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
