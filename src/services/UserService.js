import { Auth } from 'aws-amplify'
import { DataStore } from '@aws-amplify/datastore';
import { Users } from '../models';

async function signUser(username, password) {
        await Auth.signUp({
          username,
          password,
          attributes: {
            email,
            'custom:playlist': []
          }
        })
        await Auth.signIn(username, password);

        const userInfo = await Auth.currentUserInfo();
        console.log('userInfo',userInfo);
        // const user = await DataStore.save(
        //     new Users({
        //         "id": userInfo.id,
        //         "email": userInfo.attributes.email
        //     })
        // );
        // const models = await DataStore.query(Users);
        // console.log(user)
        // console.log(models);
}



export const userService = {
   signUser 
}