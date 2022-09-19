import React, { Component } from "react";
import UserService from "../services/user.service";
import { useState,useEffect } from "react";
import service from "../service";
import "./board-user.component.css";
import { Navigate, NavLink,useNavigate } from "react-router-dom";

const BoardUser = ()=>{
  const navigate = useNavigate()
  
  const [allcoupons,setAllcoupons] = useState([])
  //useState returns 2 values,one is the value for allcoupons and another is the function whih 
  //changes allcoupons value.which is stored at setAllCOupons.
  //It returns a pair of values: the current state 
  //and a function that updates it. This is why we write const [count, setCount] = useState().
  const showAllcoupons = () =>{
    service.getCupon().then((couponresponse)=> {
      setAllcoupons(couponresponse.data)
    })
  }
  useEffect(()=>{
    showAllcoupons()
    console.log(allcoupons);
  },[])
  return (
    
    <div className="landingbase">
      <div >
      <br></br>
      <center><table className="tabledesign" border={3} style={{color:"Highlight", fontFamily:"cursive", color:"brown"}}>
      <thead style={{color:"rgb(3, 4, 114)"}}>
        <tr>
          <td>Company Name</td>
          <td>Product Category</td>
          <td>Coupon Product Name</td>
          <td>Product Price</td>
          <td>Coupon Discount</td>
          <td>Coupon Code</td>
          <td>redeem</td>
        </tr>
      </thead>
      <tbody>
      {
          allcoupons.map((company,index)=>(
            <tr>
            <td>{company.company_name}</td>
            <td>{company.product_category}</td>
            <td>{company.coupon.coupon_product_name}</td>
            <td>{company.coupon.product_price}</td>
            <td>{company.coupon.coupon_discount}%</td>
            <td>{company.coupon.coupon_code}</td>
            <td><button className="btn btn-outline-primary" onClick={()=>
            {
              //checks whether user is logged in in the locallstorage as user.
              if(localStorage.getItem("user")){
                window.location.href=`http://localhost:9090`
              } 
              else{
                navigate("/login")
              }
            }}>Redeem</button></td>
            </tr>
          ))
        }
        </tbody>
      </table>
      </center>
      <br></br>
      
      </div>
    </div> 
    
  );
}
export default BoardUser;
