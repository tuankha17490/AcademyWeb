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
    Name: 'AdminCreate'
  },
  {
    ID: 8,
    Name: 'JoinClass'
  },
  {
    ID: 9,
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
      ID:count,
      Module_Id: modules[i].ID,
      Method_Id: methods[y].ID
    })
    count++
  }
}

const admin_role_permission = []
for(let i = 1; i < count; i++) {
  admin_role_permission.push({
    Role_Id: 1,
    Permission_Id: i
  })
}

const student_role_permission = []

modules.forEach(module => {
  methods.forEach(method => {
    if(module.Name == 'Users') {
      if(method.Name == 'Read' || method.Name == 'UpdateMyUser') {
        permissions.forEach(permission => {
          if(permission.Method_Id == method.ID && permission.Module_Id == module.ID) {
            student_role_permission.push({
              Role_Id: 4,
              Permission_Id: permission.ID
            })
          }
        })
      }
    }
    // if(module.Name == 'Class') {
    //   if(method.Name == 'Read' || method.Name == 'UpdateMyUser') {
    //     permissions.forEach(permission => {
    //       if(permission.Method_Id == method.ID && permission.Module_Id == module.ID) {
    //         student_role_permission.push({
    //           Role_Id: 4,
    //           Permission_Id: permission.ID
    //         })
    //       }
    //     })
    //   }
    // }
  })
  
});

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('Role_Permission').del();
  await knex('Permissions').del();
  await knex('Methods').del();
  await knex('Modules').del();
  await knex('Roles').del()
  await knex('Roles').insert([
    {ID: 1, Name: 'Admin'},
    {ID: 2, Name: 'Moderator'},
    {ID: 3, Name: 'Teacher'},
    {ID: 4, Name: 'Student'}
  ]);
  await knex('Methods').insert(methods);
  await knex('Modules').insert(modules);
  await knex('Permissions').insert(permissions);
  await knex('Role_Permission').insert(admin_role_permission);
  await knex('Role_Permission').insert(student_role_permission);

};