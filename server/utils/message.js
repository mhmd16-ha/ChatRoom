import moment from 'moment'
export function message(userName,text){
    return {
        userName,
        text,
        time:moment().format("h:mm a")
    }
}