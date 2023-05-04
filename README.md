# SLTtoDropdown (Single Line of Text to Dropdown)
A PCF control to transform single line to text/ number type field to a dropdown in Model Driven Power Apps form. The values for this PCF will be static based on user input.

This PCF control is supported for both Single Line of Text field and Whole Number type field.

**Ways to use the PCF control:**
1. Download the managed solution file and import it in your environment. You can use the control directly.
2. Clone the GitHub repository if you want to update the code. After cloning, run **npm run build** in the terminal to install the dependencies. After the dependies are installed, you can use the control.

**Explanation on Usage:**
The PCF controls has two property:
1. First property accepts the input for the values to be shown in the Dropdown. The values should be seperated by a semi-colon(;).
2. Bound property for sected value which will be pointed to the field on Model Driven App form.
