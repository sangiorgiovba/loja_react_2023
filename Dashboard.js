import React from 'react';
import Layout from "../../components/Layout/Layout";
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';



const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Painel - Loja Online"}>
        <div className='container-fluid p-3 m-3'>
            <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                  <div className="col-md-9">
                    <div className="card w-70 p-3">
                      <h4>{auth?.user?.name}</h4>
                      <h4>{auth?.user?.email}</h4>
                      <h4>{auth?.user?.phone}</h4>
                    </div>
                </div>
              </div>
        </div>

    </Layout>
    
  );
};

export default Dashboard;