const { Principal } = require("loopback");

module.exports = function (app) {
    const { User, Role, RoleMapping } = app.models
    const defaultUser = {
        username: 'mesfin',
        email: 'mesfin@gmail.com',
        password: 'mesfin'
    }
    const defaultRole = { name: 'admin' }
    User.create(defaultUser, function (err, user) {
        if (err) console.log("Unable to create Admin user. Error: " + err)
        console.log("User created.", user)
        Role.create(
            defaultRole, function (err, role) {
                if (err) console.log("Unable to create role. Error: " + err)
                console.log("Role created. ", role)
                role.principals.create({
                    principalType: RoleMapping.USER,
                    principalId: user.id
                }, function (err, principal) {
                    if (err) console.log("Unable to create principlas.")
                    console.log("Principal Created.", principal)
                })
            }
        )
    })

};