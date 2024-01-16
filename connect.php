<?php
if($_SERVER['REQUEST_METHOD']=='POST'){
$name=$_POST['name'];
$email=$_POST['email'];
$comment=$_POST['comment'];
}
$con=new mysqli('localhost','root','vinay111','firstdb');
if($con){
    $sql="insert into firsttb(name,email,comment) values('$name','$email','$comment')";
    $result=mysqli_query($con,$sql);
    if($sql){
        echo 'sucsess';
    }
    else{
        die(mysqli_error($con));
    }
}
else{
    die(mysqli_error($con));
}

?>