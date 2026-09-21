import PasswordValidator from "password-validator"

var schema = new PasswordValidator();

// Add properties to it
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase(1)                             // Must have at least 1 uppercase letter
    .has().lowercase(1)                             // Must have at least 1 lowercase letter
    .has().digits(1)                                // Must have at least 1 digit
    .has().not().spaces()                           // Should not have spaces
    .has().symbols(1)                               // Must have at least 1 Symbol
    .is().not().oneOf(['Passw0rd', 'Password123', 'User@123']); // Blacklist these values

export default function FormValidator(e) {
    let { name, value } = e.target
    switch (name) {
        case "name":
        case "email":
        case "username":
        case "question":
        case "address":
        case "pin":
        case "city":
        case "subject":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 3 || value.length > 200)
                return name + " Field Length Must be 3-200 Character"
            else
                return ""

        case "message":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 50)
                return name + " Field Length Must be Greater Then 50 Character"
            else
                return ""

        case "state":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 2 || value.length > 50)
                return name + " Field Length Must be 2-50 Character"
            else
                return ""

        case "password":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (!schema.validate(value)) {
                let error = schema.validate(value, { details: true })
                return error[0]?.message ?? "Invalid Password"
            }
            else
                return ""

        case "phone":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 10 || value.length > 10)
                return "Phone Number Length Must Be 10 Digits"
            else if (!(value.startsWith("6") || value.startsWith("7") || value.startsWith("8") || value.startsWith("9")))
                return "Invalid Phone Number, Phone Number Must Start With 6,7,8 or 9"
            else
                return ""

        case "basePrice":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (parseInt(value) < 1)
                return "Base Price Must Be a Positive Value"
            else
                return ""

        case "discount":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (parseInt(value) < 0 || parseInt(value) > 100)
                return "Discount Must Be 0-100"
            else
                return ""

        case "stockQuantity":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (parseInt(value) < 0)
                return "StockQuantity Can't Be Negative"
            else
                return ""

        case "icon":
        case "shortDescription":
        case "answer":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else
                return ""

        default:
            return ""
    }
}
