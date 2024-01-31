const authPage = (permissions) => {
    return (req, res, next) => {
        const userRole = req.payload.role
        console.log(userRole, "IIII")
        console.log(permissions)
        if (permissions.includes(userRole)) {
            console.log(`Only ${permissions}`)
            next()
        } else {
            console.log("dont have permission!!!!")
            return res.json({ error: true, message: "You dont have permission!" })
        }
    }
}

module.exports = { authPage }