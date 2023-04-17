// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Add 
{

    uint firstNo=1 ;
    uint secondNo=2;
 
    function setValues(uint x, uint y) public {
        firstNo = x;
        secondNo = y;
    }
    

    function showTotal() view public returns (uint) 
    {
        uint Sum = firstNo + secondNo ;

        return Sum;
    }
}