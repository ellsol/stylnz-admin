'use client';

import { createTestClients } from '@/app/api/create_clients';
import { getEnvironment, Env } from '@/app/api/config';
import * as repl from 'repl';


export default function Test() {


  async function testLogin(e: any) {
    e.preventDefault();
    // Explicitly constructing clients here to
    // leave other DI options available for real web devs ;)
    const clients = createTestClients(getEnvironment(Env.Production), true)

    // TODO fill in your data here
    const testEmail = "YOUR_EMAIL"
    const testPassword = "YOUR_PASSWORD"

    const apiClient = clients[0]
    const ipClient = clients[1]

    // signing in -> the ipClient will automagically store the token in local storage
    const response = await ipClient.signIn(testEmail, testPassword)
    console.log(response)

    // getting myself how the resource service sees me
    const meResponse = await apiClient.me()
    console.log(meResponse)

    // getting the mobile users
    const usersResponse = await apiClient.users()
    console.log(usersResponse)
  }

  return (
    <div>
      <div>Test Login</div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={testLogin}>Login</button>
    </div>

  )
}