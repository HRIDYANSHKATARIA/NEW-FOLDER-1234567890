status = "";
video = "";
objects = [];

function setup()
{
    canvas = createCanvas(480,380);
    canvas.center();
}

function preload()
{
  video = createVideo('video.mp4');
  video.hide();
}

function draw()
{
    image(video,0,0,480,380);
    if(status != "")
    {
     objectDetector.detect(video,gotResults);    
    }

    for(i = 0;i < objects.length;i++)
    {
        document.getElementById("number_of_objects").innerHTML = "Number of Objects = "+objects.length;
        document.getElementById("status").innerHTML = "Objects Detected";
        fill("red");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label+ " " + percent + "%", objects[i].x+15,objects[i].y+15);
        noFill();
        stroke("red");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
}

function start()
{
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
    objectDetector = ml5.objectDetector('cocossd',modelloaded);
}

function modelloaded()
{
    console.log('modelloaded');
    status = true;
    video.loop();
    video.speed(1);
    video.volume(1);
}
function gotResults(error,results)
{

    if (error)
    {
        console.log(error);    
    }
    else{
        console.log(results);
        objects = results;
    }
    
}