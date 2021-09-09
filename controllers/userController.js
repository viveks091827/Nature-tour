const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, '../dev-data/data/users.json')

const users = JSON.parse(fs.readFileSync(usersPath))

exports.getAllUsers = (req, res) => {
    res.status(200).json({
      status : 'success',
      results : users.length,
      data : {
        users
      }
    })
  }
  
  exports.createUser = (req, res) => {
    res.status(500).json({
      status : 'Error',
      message : 'This route is yet created'
    })
  }
  
  exports.getUser = (req, res) => {
    res.status(500).json({
      status : 'Error', 
      message : 'This route is not yet created'
    })
  }
  
  exports.updateUser = (req, res) => {
    res.status(500).json({
      status : 'Error',
      message : 'This route is not yet created'
    })
  }

  exports.deleteUser = (req, res) => {
    res.status(500).json({
      status : 'Error',
      message : 'This route is not yet created'
    })
  }
