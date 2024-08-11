import {cookies} from 'next/headers';

export default async function hasUser() {
    const nextCookies = cookies();
    
    const cookie = nextCookies.get('token')
    if(!cookie) {
        return undefined
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await fetch(`${baseUrl}/user/current`, {
            headers: {
                Authorization: `Bearer ${cookie.value}`
            }
        })
        const data = await response.json()
        
        if(data.id) {
            return data
        }else {
            return undefined
        }
        
        
    } catch (error) {
        console.log(error)
    }
    
    
}
