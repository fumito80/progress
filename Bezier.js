var canvas = document.getElementById('canvas');
canvas.width = 800;
var c = canvas.getContext('2d');

// 2次ベジェ曲線
// c.strokeStyle = 'red';
// c.lineWidth = 2;
// c.beginPath();
// c.moveTo(10, 10);
// c.quadraticCurveTo(80, 80, 10, 150);
// c.stroke();

// 直線
// c.strokeStyle = 'silver';
// c.lineWidth = 1;
// c.beginPath();
// c.moveTo(10, 10);
// c.lineTo(80, 80);
// c.lineTo(10, 150);
// c.stroke();

// // 3次ベジェ曲線
// c.strokeStyle = 'blue';
// c.lineWidth = 2;
// c.beginPath();
// c.moveTo(160, 10);
// c.bezierCurveTo(290, 50, 160, 90, 290, 140);
// c.stroke();

// // 直線
// c.strokeStyle = 'silver';
// c.lineWidth = 1;
// c.beginPath();
// c.moveTo(160, 10);
// c.lineTo(290, 50);
// c.lineTo(160, 90);
// c.lineTo(290, 140);
// c.stroke();

// 3次ベジェ曲線
c.strokeStyle = 'blue';
c.lineWidth = 2;
c.beginPath();
c.moveTo(790, 10);
c.bezierCurveTo(790, 100, 10, 50, 10, 140);
c.stroke();

// 3次ベジェ曲線
c.strokeStyle = 'blue';
c.lineWidth = 2;
c.beginPath();
c.moveTo(290, 10);
c.bezierCurveTo(290, 100, 10, 50, 10, 140);
c.stroke();

// 直線
// c.strokeStyle = 'silver';
// c.lineWidth = 1;
// c.beginPath();
// c.moveTo(290, 10);
// c.lineTo(290, 140);
// c.lineTo(160, 10);
// c.lineTo(160, 140);
// c.stroke();
