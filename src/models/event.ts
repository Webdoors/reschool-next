export interface Participant{
    fullName: string,
    email: string,
    phone: string
}

export interface EventModel {
    id: string,
    imageName: string,
    date: string,
    time: string,
    title: string,
    _id: string,
    status:'active' | 'disabled'
    participants: Participant[]
   
}