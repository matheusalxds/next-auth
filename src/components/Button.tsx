import React from "react";

type BtnProps = { children: any, onClick: () => any }
export const Button = ({ children, ...otherProps}: BtnProps) => <button {...otherProps} className="border border-black rounded-lg bg-green-500 px-5 py-1">{children}</button>
