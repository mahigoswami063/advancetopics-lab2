import { initializeApp } from "firebase/app";
import {getFirestore,doc,getDocs,collection , addDoc, deleteDoc ,updateDoc}from 'firebase/firestore'

class Database {
    init=()=> {
        const firebaseConfig = {
            apiKey: "AIzaSyBer2eVRYrfC0pJKIQ39Lzcl9GNbKhVwKE",
            authDomain: "react-lab4-d8e2d.firebaseapp.com",
            projectId: "react-lab4-d8e2d",
            storageBucket: "react-lab4-d8e2d.appspot.com",
            messagingSenderId: "232201950017",
            appId: "1:232201950017:web:547fce5420577ea68e47c0"
          };
          
  
          const app = initializeApp(firebaseConfig);
          this.database = getFirestore(app)

          console.log("Database initialized")
    }

    retrieve =()=> {
        console.log("Retrieving...")
        return new Promise((res, rej) => {
            let coll = collection(this.database, 'todoList')
            getDocs(coll).then((snap)=> {
                let taskArray = []
                snap.forEach((t)=> {
                    let task = t.data()
                    task.id = t.id
                    taskArray.push(task)
                })
                console.log("Tasks Retrieved")
                res(taskArray)
            }).catch((e)=> {
                console.log("Failed to retrieve tasks: ",e)
                rej([])
            })
           
        })
    }

    add=(taskObj) =>{
        console.log("Adding...")
        return new Promise((res, rej) =>{
            let coll = collection(this.database, 'todoList')
            addDoc(coll,taskObj)
            .then(()=> {
                console.log("Task added")
                res()
            })
            .catch( (e)=> {
                console.log("Failed to add task: ",e)
                rej()
            })
        })
    } 

    delete=(taskId) =>{
        console.log("Deleting...")
        let docPath = doc(this.database, 'todoList',taskId)
        return new Promise(( res, rej) =>{
            deleteDoc(docPath).then(()=> {
                console.log("Task deleted")
                res()
            }).catch((e)=> {
                console.log("Failed to delete task", e)
                rej()
            })
        })
    }
    update= (taskObj, taskId)=> {
        console.log("Updating...")
        let docPath = doc(this.database, 'todoList',taskId)
        return new Promise((res,rej )=>{
            updateDoc(docPath , taskObj)
            .then(()=> {
                console.log("Task updated")
                res()
            }).catch( (e)=> {
                console.log("Failed to update task", e)
                rej()
            })
        })
    }
}

export default new Database