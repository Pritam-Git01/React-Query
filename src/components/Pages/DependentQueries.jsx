import React from 'react'
import { useQuery } from "@tanstack/react-query"
import axios from 'axios'


const fetchUserbyEmail = (email) => {
    return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchChannelByChannelId = (channelId) => {
return axios.get(`http://localhost:4000/channels/${channelId}`)
}
const DependentQueries = ({ email }) => {
const {data : user, isLoading : Loading} = useQuery(["user", email] , () => fetchUserbyEmail(email))
const channelId = user?.data.channelId;

const {data : courses,isLoading,isError,error} = useQuery(["channel", channelId], () => fetchChannelByChannelId(channelId),{
  enabled: !!channelId
})

if(isLoading || Loading){
  return <h2>Loading...</h2>
}
if(isError){
  return <h2>{error.message}</h2>
}
const courseList = courses?.data.courses
  return (
    <div>
      Dependenet Queries
      {
        courseList.map((item,index) => (
          <p key={index}>{item}</p>
        ))
      }

    </div>
  )
}

export default DependentQueries