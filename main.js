song="";
RightWristX=0;
LeftWristX=0;
RightWristY=0;
LeftWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
function preload()
{
    song= loadSound("music.mp3");
}
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);

}
function modelLoaded()
{
    console.log("Pose net is initialized");
}
function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        LeftWristX=results[0].pose.leftWrist.x;
        LeftWristY=results[0].pose.leftWrist.y;
        RightWristX=results[0].pose.rightWrist.x;
        RightWristY=results[0].pose.rightWrist.y;
        console.log("Left Wrist X = "+LeftWristX+" Left Wrist Y = "+LeftWristY);
        console.log("Right Wrist X = "+RightWristX+" Right Wrist Y = "+RightWristY);
    }
}
function draw()
{
    image(video, 0, 0, 600, 500 );
    fill("#FF0000");
    stroke("#FF0000");  
    if(scoreLeftWrist>0.2)
    {
        circle(LeftWristX, LeftWristY, 20);
        numberStorage=Number(LeftWristY);
        numberNoDecimal=floor(numberStorage);
        volume=numberNoDecimal/500;
        document.getElementById("volume").innerHTML="Volume = "+volume;
        song.setVolume(volume);
    }
    if(scoreRightWrist>0.2)
    {
        circle(RightWristX, RightWristY, 20);
        if(RightWristY>0 && RightWristY<=100)
        {
            document.getElementById("speed").innerHTML="Speed = 0.5x";
            song.rate(0.5); 
        }
        else if(RightWristY>100 && RightWristY<=200)
        {
            document.getElementById("speed").innerHTML="Speed = 1x";
            song.rate(1); 
        }
        else if(RightWristY>200 && RightWristY<=300)
        {
            document.getElementById("speed").innerHTML="Speed = 1.5x";
            song.rate(1.5); 
        }
        else if(RightWristY>300 && RightWristY<=400)
        {
            document.getElementById("speed").innerHTML="Speed = 2x";
            song.rate(2); 
        }
        else if(RightWristY>400)
        {
            document.getElementById("speed").innerHTML="Speed = 2.5x";
            song.rate(2.5); 
        }
    }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}