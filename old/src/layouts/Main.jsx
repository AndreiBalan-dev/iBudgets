// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

// assets
import wave from "../assets/wave.svg";

// components
import Nav from "../components/Nav";

//  helper functions
import { fetchData } from "../helpers";

import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

// loader
export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Main = () => {
  const { userName } = useLoaderData();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then(value => {
        if (value.data?.user) {
          setUser(value.data.user);
        } else {
          setUser(null);
        }
      });
    }
    getUserData();
  }, []);
  return (
    <div className="layout">
      <Nav userName={userName} user={user} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  );
};
export default Main;
