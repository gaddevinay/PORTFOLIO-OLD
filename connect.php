
<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $comment = $_POST['comment'];
}
$con = new mysqli('localhost', 'id21797985_vinay', 'Vinay@111', 'id21797985_portfolio');
if ($con) {
    $sql = "insert into db(name,email,comment) values('$name','$email','$comment')";
    $result = mysqli_query($con, $sql);
    if ($sql) {
        echo '<h1>sucsess</h1>';
        echo '<script> window.location.replace("/")</script>';
    } else {
        die(mysqli_error($con));
    }
} else {
    die(mysqli_error($con));
}

?>