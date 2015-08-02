<?php
$title = 'Floor planner' ;
$stylesheets = array('style.css') ;
$js_scripts  = array('functions.js') ;
include($_SERVER['FILE_PREFIX'] . '/_core/preamble.php') ;
?>
    <div class="right">
      <h3>About this page</h3>
      <div class="blurb">
        <p>This page is for helping to rearrange my living space.</p>
        <canvas id="canvas_room" width="800" height="450"></canvas>
      </div>
    </div>
    
    <textarea id="textarea_info" cols="80" rows="20"></textarea>

<?php foot() ; ?>
