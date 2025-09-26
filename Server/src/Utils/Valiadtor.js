const validator = require('validator')

const validate = (data)=>{

    try {

        if(!data) {
            throw new Error('data not present- Validator')
        }

        const mandatoryFeild = ['firstName', 'emailId', 'password']
        const IsAllowed = mandatoryFeild.every(key=> data[key])

        if(!IsAllowed){
            throw new Error('Some Feild is missing')
        }

        if(!validator.isEmail(data.emailId))
            throw new Error('Email is not correct')

        if(!validator.isStrongPassword(data.password))
            throw new Error('Weak password')

        return {success: true}

    } catch (error) {
        return {success: false, message: error.message}
    }
}

module.exports = validate