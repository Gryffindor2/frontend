'use client'
import { useEffect } from "react";
import { authenticated } from "./public/auth";
function jump(){
  if (authenticated()) {
    window.location.href = "/tools/classification";
  }
  else{
    window.location.href = "/login";
  }
}
export default function Home() {
  useEffect(()=>{
    jump();
  });
  return (
    <></>
  );
}
