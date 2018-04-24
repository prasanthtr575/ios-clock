const svgNS = "http://www.w3.org/2000/svg";
const viewPortWidth = window.innerWidth;
const viewPortHeight = window.innerHeight;
const viewPortMargin = 20;
const clockSize = (viewPortWidth > viewPortHeight ? viewPortHeight : viewPortWidth) - viewPortMargin;
const svgEl = document.getElementById("svgEl");
const cx = clockSize / 2;
const cy = cx;
const radiusOffset = 20;
const r = cx - radiusOffset;

createClock();

function createClock() {
   //Set SVG Size
   svgEl.setAttribute("width", clockSize);
   svgEl.setAttribute("height", clockSize);
   svgEl.style.borderRadius = `${clockSize / 5}px;`

   //Add Clock frame
   let clockRound = createCircle(cx, cy, r, "black", 5, "#ffffff");
   svgEl.appendChild(clockRound);

   //Create Clock dial
   createDial(cx, cy, r, r, "black", 5, svgEl);

   //Calculate Time
   let now = new Date();
   let sec = now.getSeconds();
   let min = now.getMinutes() + sec / 60;
   let hr = now.getHours() + min / 60;
   hr = hr > 12 ? hr - 12 : hr;

   //Create Hands
   let secHand = createLine(cx, cy, cx, cy, "red", 3, "secHand");
   let secBalanceHand = createLine(cx, cy, cx, cy, "red", 3, "secBalanceHand");
   let minHand = createLine(cx, cy, cx, cy, "black", 6, "minHand");
   let hrHand = createLine(cx, cy, cx, cy, "black", 8, "hrHand");
   let redCapCircle = createCircle(cx, cy, 6, "red", 0, "red");
   let grayCapCircle = createCircle(cx, cy, 2, "gray", 0, "gray");
   let blackCapCircle = createCircle(cx, cy, 12, "black", 0, "black");
   let pinCircle = createCircle(cx, cy, 0.25, "black", 0, "black");

   svgEl.appendChild(hrHand);
   svgEl.appendChild(minHand);
   svgEl.appendChild(blackCapCircle);
   svgEl.appendChild(secHand);
   svgEl.appendChild(secBalanceHand);
   svgEl.appendChild(redCapCircle);
   svgEl.appendChild(grayCapCircle);
   svgEl.appendChild(pinCircle);

   setupHand(sec, cx, cy, r - 10, 60, "secHand", "seconds", 90);
   setupHand(sec, cx, cy, 20, 60, "secBalanceHand", "seconds", -90);
   setupHand(min, cx, cy, r - 17, 60, "minHand", "minutes", 90);
   setupHand(hr, cx, cy, r - 100, 12, "hrHand", "hours", 90);
}

function setupHand(time, cx, cy, radius, divisions, handId, duration, angleShift) {
   let hand = document.getElementById(handId);
   let angleInRadians = (time/divisions * 360 - angleShift) * Math.PI / 180.0;
  
   x = cx + (radius * Math.cos(angleInRadians)),
   y = cy + (radius * Math.sin(angleInRadians))
  
   hand.setAttribute("x2", x);
   hand.setAttribute("y2", y);
  
   hand.setAttribute("class", `handRotation ${duration}`);
}

function createCircle(cx, cy, r, stroke, strokeWidth, fill) {
   let circle = document.createElementNS(svgNS, "circle");
  
   circle.setAttribute("cx", cx);
   circle.setAttribute("cy", cy);
   circle.setAttribute("r", r);
   circle.setAttribute("stroke", stroke);
   circle.setAttribute("stroke-width", strokeWidth);
   circle.setAttribute("fill", fill);
  
   return circle;
}

function createLine(x1, y1, x2, y2, stroke, strokeWidth, domId) {
   let line = document.createElementNS(svgNS, "line");
  
   line.setAttribute("x1", x1);
   line.setAttribute("y1", y1);
   line.setAttribute("x2", x2);
   line.setAttribute("y2", y2);
   line.setAttribute("stroke", stroke);
   line.setAttribute("stroke-width", strokeWidth);
  
   if(domId) {
       line.setAttribute("id", domId);
   }
  
   return line;
}

function createText(x, y, content, fill) {
   let text = document.createElementNS(svgNS, "text");
  
   text.setAttribute("x", x);
   text.setAttribute("y", y + 10);
   text.setAttribute("fill", fill);
   text.setAttribute("font-family", "Arial,Helvetica");
   text.setAttribute("font-weight", "bold");
   text.setAttribute("font-size", "30px");
   text.setAttribute("stroke", "none");
   text.setAttribute("text-anchor", "middle");
   text.innerHTML = content;
  
   return text;
}

function createDial(cx, cy, startRadius, endRadius, stroke, strokeWidth, svgEl) {
   for(let i = 1; i <= 60; i++) {
       let angle = i / 60 * 360;
       let start = polarToCartesian(cx, cy, startRadius, angle);
       let end = polarToCartesian(cx, cy, endRadius, angle);
       let line = createLine(start.x, start.y, end.x, end.y, stroke, strokeWidth);
       svgEl.appendChild(line);
        
       if(angle % 5 === 0) {
           let textPos = polarToCartesian(cx, cy, endRadius - 20, angle);
           let text = createText(textPos.x, textPos.y, angle/30 , "black");
           svgEl.appendChild(text);
       }
   }
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
 var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

 return {
   x: centerX + (radius * Math.cos(angleInRadians)),
   y: centerY + (radius * Math.sin(angleInRadians))
 };
}





