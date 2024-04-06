<template onload="fetchUserProfile">
    <div id="inputtask">
        <h2>Daily Activity Tracking</h2>
        <span>Task</span><input type="text" id="intask" v-model="Task"><button @click="handleSaveTask">Save Task</button>

    </div>

    <ul id="task">

    </ul>

</template>

<script>
export default {
    name: "App",



    async created(){
        const savedData = await this.fetchSaveTask()
        this.newtask.value = savedData
    },


    methods: {
        async handleSaveTask(){
            var intask = document.getElementById("intask")
            var litask = document.getElementById("task")

            var newtask= document.createElement("li")

            newtask.textContent = intask.value
            litask.appendChild(newtask)

            payload = {
                task: intask.value
            }

            const res = await fetch("save-task",{
                body: JSON.stringify(payload),
                method: "POST",
                headers: {
                    "Accept": "Application/json",
                    "Content-Type": "Application/json"
                }
                
            })
            return await res.json()


        },
        async fetchSaveTask(){
            const res = await fetch("get-task")
            return await res.json()
        }
    }
}

</script>

<style>
#inputtask {
    width: 70%;
    margin: auto;
    border: 1px solid black;
    padding: 20px;
    background-color: antiquewhite;
}
input{
    height: 55px;
    width: 60%;
    margin-left: 10px;
    margin-right: 10px;
    background-color: rgb(217, 220, 224);
    font-size: 20px;
    
}
button{
    height: 40px;
    background-color: aqua;
    width: 80px;
    

}
h2{
    margin-left: 160px;
    text-transform: uppercase;
}
span {
    font-size: 25px;
}

#task {
    margin-left: 160px;
}


</style>