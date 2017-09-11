import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

//---------- Fixture ---------
if (Meteor.isDevelopment) {
    // User
    const users = [
        {
            username: 'super',
            email: 'super@rabbit.com',
            password: 'rabbitsuper',
            profile: {
                fullName: 'Theara',
                branchPermissions: ['001'],
                roleGroup: 'Super',
            },
            roles: [
                'companyUpdate',
                'branchList', 'branchInsert', 'branchUpdate', 'branchRemove',
            ],
        },
    ];

    users.forEach(({ username, email, password, profile, roles }) => {
        const userExists = Meteor.users.findOne({ 'emails.address': email });

        if (!userExists) {
            const userId = Accounts.createUser({ username, email, password, profile });
            Roles.addUsersToRoles(userId, roles);
        }
    });
}
