import { createClient } from "@supabase/supabase-js";
import { Auth, ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const supabase = createClient (
    "https://bxqljlahpxgvjybwodkl.supabase.co/",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4cWxqbGFocHhndmp5YndvZGtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwNTI1MDYsImV4cCI6MjAzNzYyODUwNn0.eKcTCZ5k0cZRta4pBmx8o3qPd7tgW0YJOEzkAWQfq90"
);
function Success() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserData() {
            await supabase.auth.getUser().then((value) => {
                // value.data.user
                if(value.data?.user) {
                    console.log(value.data.user);
                    setUser(value.data.user);
                }
            })
        }
        getUserData();
    }, []);

    async function signOutUser()  {
        const { error } = await supabase.auth.signOut();
        navigate("/");
    }

    return (
        <div className="App">
            <header className="App-header">
                { Object.keys(user).length !== 0 ?
                    <>
                        <h1>Success</h1>
                        <button onClick={() => signOutUser()}>Sign Out</button>
                    </>
                :
                    <>
                        <h1>User is not logged in</h1>
                        <button onClick={() => { navigate("/") }}>Go back home!</button>
                    </>
                }
                <h1>Success</h1>
               
            </header>
        </div>
    );
}

export default Success;
