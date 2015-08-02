<?php
include_once($_SERVER['FILE_PREFIX']."/project_list/project_object.php") ;
$github_uri   = "https://github.com/aidansean/floorplan" ;
$blogpost_uri = "http://aidansean.com/projects/?tag=floorplan" ;
$project = new project_object("floorplan", "Floorplan", "https://github.com/aidansean/floorplan", "http://aidansean.com/projects/?tag=floorplan", "floorplan/images/project.jpg", "floorplan/images/project_bw.jpg", "This was a quickly written project to help me rearrange the furniture in my new apartment.  This project has scope for a lot of further development in the future.", "Tools", "canvas,HTML,JavaScript") ;
?>