import React from "react";
import { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import service from "../service";
import "./addCoupon.css";


const AddCoupon = () =>
{
    const navigation = useNavigate();
    const getuserid = useLocation()//checks for any received value from any component(here board-company-component)
    const [company_id,setCompany_id] = useState(""); 
    const [location,setlocation] = useState("");
    const [company_email,setCompany_email] = useState("");
    const [company_name,setCompany_name] = useState("");
    const company_pswd = localStorage.getItem('password');
    const [product_category,setProduct_category] = useState("");
    const [coupon_Id,setCoupon_Id] = useState(0);
    const [coupon_discount,setCoupon_discount] = useState("");
    const [coupon_code,setCoupon_code] = useState("");
    const [coupon_product_name,setCoupon_product_name] = useState("");
    const[product_price,setProduct_price] = useState(0);
    const[coupon_set_name,setCoupon_set_name] = useState("");
    console.log(getuserid.state);
    const coupon = {coupon_Id,coupon_discount,coupon_code,coupon_product_name,product_price,coupon_set_name}
    const company = {company_name,location,company_email,company_pswd,product_category,coupon}
    
    const addcouponfront = () =>
    {
        service.addnewcoupon(company).then((response) =>{
            console.log(response.data);
            navigation("/company");
        }).catch(console.error);
    }
    const updateCoupon=(ev) =>
    {
        ev.preventDefault();//after clicking the update button,it prevents all the values from being reset(0).
        if(getuserid.state)
        {
            service.updateCouponById(getuserid.state,company).then((responsed)=>{
                console.log("updated",responsed.data)
                navigation("/company");
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
    useEffect(() => {
        if(getuserid.state)//cotains the id sent from board-company component
        {
            //promise object returned from service through axios call.promise contains then and catch
            service.getcouponbycompId(getuserid.state).then((responsed)=>{
                setCompany_id(responsed.data.company_id)
                setlocation(responsed.data.location)
                setCompany_email(responsed.data.company_email)
                setCompany_name(responsed.data.company_name)
                setProduct_category(responsed.data.product_category)
                setCoupon_Id(responsed.data.coupon.coupon_Id)
                setCoupon_discount(responsed.data.coupon.coupon_discount)
                setCoupon_code(responsed.data.coupon.coupon_code)
                setCoupon_product_name(responsed.data.coupon.coupon_product_name)
                setProduct_price(responsed.data.coupon.product_price)
                setCoupon_set_name(responsed.data.coupon.coupon_set_name)
            }
            ).catch(
                (error)=>console.log(error)
            )
        }
      }, []);

       return (
        <div className="addingform" >
        <br></br>
        <br></br>
            <form className="formdesign"  style={{marginLeft: "420px",backgroundColor: "aquamarine"}}>
            <h1 style={{color:"Highlight", fontFamily:"cursive", color:"brown"}}>Insert/Update Coupon</h1>
                <label>
                    CompanyName:
                </label>
                <input type="text" required  value={company_name} onChange={e=>setCompany_name(e.target.value)}></input>
                <label>
                    location:
                </label>
                <input type="text" required value={location} onChange={e=>setlocation(e.target.value)}></input>
                <label>
                    company_email
                </label>
                <input type="text" required value={company_email} onChange={e=>setCompany_email(e.target.value)}></input>
                <label>
                    product_category
                </label>
                <input type="text" required  value={product_category} onChange={e=>setProduct_category(e.target.value)}></input>
                <label>
                    coupon_discount
                </label>
                <input type="text" required value={coupon_discount} onChange={e=>setCoupon_discount(e.target.value)}></input>
                <label>
                    coupon_code
                </label>
                <input type="text" required value={coupon_code} onChange={e=>setCoupon_code(e.target.value)}></input>
                <label>
                    Product_Name
                </label>
                <input type="text" required value={coupon_product_name} onChange={e=> setCoupon_product_name(e.target.value)}></input>
                <label>
                    Product_price
                </label>
                <input type="number" required value={product_price} onChange={e=> setProduct_price(e.target.value)}></input>
                <label>
                    coupon_set_name
                </label>
                <input type="text" required value={coupon_set_name} onChange={e=> setCoupon_set_name(e.target.value)}></input>
                <br></br>
                <br></br>

            {
                company_id == "" ? (<div>
           <button onClick={addcouponfront} className="btn btn-primary" type="button">Add Coupon </button>
           <br></br></div>): 
           (<div><br></br>
           <button onClick={(e)=>updateCoupon(e)} className="btn btn-primary" type="button">update Coupon </button>
            </div>)}
            </form>
           
           <br></br>
           <br></br>
           
        </div>
       )
} 
export default AddCoupon;