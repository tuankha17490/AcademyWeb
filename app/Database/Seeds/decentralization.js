const methods = [{
    ID: 1,
    Name: 'Create'
  },
  {
    ID: 2,
    Name: 'Read'
  },
  {
    ID: 3,
    Name: 'Update'
  },
  {
    ID: 4,
    Name: 'Delete'
  },
  {
    ID: 5,
    Name: 'GetList'
  },
  {
    ID: 6,
    Name: 'Search'
  },
  {
    ID: 7,
    Name: 'JoinClass'
  },
  {
    ID: 8,
    Name: 'UpdateMyUser'
  }
]

const modules = [{
    ID: 1,
    Name: 'Users'
  },
  {
    ID: 2,
    Name: 'Class'
  },
  {
    ID: 3,
    Name: 'Subject'
  },
  {
    ID: 4,
    Name: 'Post'
  },
]
let count = 1
const permissions = []
for (let i = 0; i < modules.length; i++) {
  for (let y = 0; y < methods.length; y++) {
    permissions.push({
      ID: count,
      Module_Id: modules[i].ID,
      Method_Id: methods[y].ID
    })
    count++
  }
}

const admin_role_permission = []
for (let i = 1; i < count; i++) {
  admin_role_permission.push({
    Role_Id: 1,
    Permission_Id: i
  })
}

const student_role_permission = []

function StudentRole(moduleName, methodNames = []) {
  modules.forEach(module => {
    if (moduleName == module.Name) {
      for (let i = 0; i < methodNames.length; i++) {
        methods.forEach(method => {
          if (method.Name == methodNames[i]) {
            permissions.forEach(permission => {
              if (permission.Method_Id == method.ID && permission.Module_Id == module.ID) {
                student_role_permission.push({
                  Role_Id: 4,
                  Permission_Id: permission.ID
                })
              }
            })
          }
        });
      }
    }
  })
}

const teacher_role_permission = []

function TeacherRole(moduleName, methodNames = []) {
  modules.forEach(module => {
    if (moduleName == module.Name) {
      for (let i = 0; i < methodNames.length; i++) {
        methods.forEach(method => {
          if (method.Name == methodNames[i]) {
            permissions.forEach(permission => {
              if (permission.Method_Id == method.ID && permission.Module_Id == module.ID) {
                teacher_role_permission.push({
                  Role_Id: 3,
                  Permission_Id: permission.ID
                })
              }
            })
          }
        });
      }
    }
  })
}

const moderator_role_permission = []

function ModeratorRole(moduleName, methodNames = []) {
  modules.forEach(module => {
    if (moduleName == module.Name) {
      for (let i = 0; i < methodNames.length; i++) {
        methods.forEach(method => {
          if (method.Name == methodNames[i]) {
            permissions.forEach(permission => {
              if (permission.Method_Id == method.ID && permission.Module_Id == module.ID) {
                moderator_role_permission.push({
                  Role_Id: 2,
                  Permission_Id: permission.ID
                })
              }
            })
          }
        });
      }
    }
  })

}
// modules.forEach(module => {
//   methods.forEach(method => {
//     if(module.Name == 'Users') {
//       if(method.Name == 'Read' || method.Name == 'UpdateMyUser') {
//         permissions.forEach(permission => {
//           if(permission.Method_Id == method.ID && permission.Module_Id == module.ID) {
//             student_role_permission.push({
//               Role_Id: 4,
//               Permission_Id: permission.ID
//             })
//           }
//         })
//       }
//     }

//   })

// });
exports.seed = async function (knex) {
  await StudentRole('Users', ['UpdateMyUser'])
  await StudentRole('Class', ['Read'])
  await StudentRole('Subject', ['Read'])
  await StudentRole('Post', ['Read'])

  await TeacherRole('Users', ['UpdateMyUser'])
  await TeacherRole('Class', ['Read'])
  await TeacherRole('Subject', ['Read'])
  await TeacherRole('Post', ['Read', 'Create', 'Update', 'Delete'])

  await ModeratorRole('Users', ['Create', 'GetList','UpdateMyUser', 'Search', 'Update'])
  await ModeratorRole('Class', ['Read', 'JoinClass','GetList', 'Search'])
  await ModeratorRole('Subject', ['Read', 'GetList', 'Search'])
  await ModeratorRole('Post', ['Read', 'GetList', 'Search'])

  // Deletes ALL existing entries
  await knex('Role_Permission').del();
  await knex('Permissions').del();
  await knex('Methods').del();
  await knex('Modules').del();
  await knex('Roles').del()
  await knex('Roles').insert([{
      ID: 1,
      Name: 'Admin'
    },
    {
      ID: 2,
      Name: 'Moderator'
    },
    {
      ID: 3,
      Name: 'Teacher'
    },
    {
      ID: 4,
      Name: 'Student'
    }
  ]);
  await knex('Methods').insert(methods);
  await knex('Modules').insert(modules);
  await knex('Permissions').insert(permissions);
  await knex('Role_Permission').insert(admin_role_permission);
  await knex('Role_Permission').insert(moderator_role_permission);
  await knex('Role_Permission').insert(teacher_role_permission);
  await knex('Role_Permission').insert(student_role_permission);


};