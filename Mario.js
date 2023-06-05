/*2) 플레이어 생성*/
class Mario extends GameObject {

    //6)
    //js에서 개발자가 현재 클래스의 생성자를 정의하지 않을 경우,
    //js 자체적으로 부모를 먼저 생성해줌
    //그러나 개발자가 현재 클래스의 생성자를 정의할 경우,
    //개발자가 주도하는 것이기에, js에서 부모를 자동생성하지 않고 개발자가 부모생성처리까지 맡아야함.
    constructor(container, src, width, height, x, y, velX, velY) { //플레이어는 이미지를 둘러싼 wrapper와 4개의 센서막대도 있어야함
        super(container, src, width, height, x, y, velX, velY); //부모 생성자 호출

        //나에 대한 초기화
        this.wrapper; //센서들을 감쌀 div

        this.sensorArray = new Array(4);

        this.wrapper = document.createElement("div");
        this.wrapper.style.width = this.width + "px";
        this.wrapper.style.height = this.height + "px";

        //바깥쪽 wrapper는 이미지를 포함해야함
        //부모인 gameobject에서 img를 stage에 부착했었으나
        //아래의 코드(appendChild)에 의해 부착대상이 wrapper로 변경됨(별도의 removeChild() 필요 없음)
        this.wrapper.appendChild(this.img);
        this.container.appendChild(this.wrapper);

        //실제적으로 움직이는 대상은 wrapper이므로 포지션이 적용되어야함
        this.wrapper.style.position = "absolute";
        this.wrapper.style.left = this.x + "px";
        this.wrapper.style.top = this.y + "px";

        //좌측 센서
        this.sensorArray[0] = new Sensor(this.wrapper, 1, 22, -1, ((this.height - 22) / 2));

        /*
        this.divLeft=document.createElement("div");
        this.divLeft.style.background="red";
        this.divLeft.style.width=1+"px";
        this.divLeft.style.height=22+"px";
        this.divLeft.style.position="absolute"; //wrapper의 자식
        this.divLeft.style.left=-(parseInt(this.divLeft.style.width))+"px";
        this.divLeft.style.top=((this.height-parseInt(this.divLeft.style.height))/2)+"px";
        this.wrapper.appendChild(this.divLeft);
        */
       
       //위쪽 센서
       this.sensorArray[1] = new Sensor(this.wrapper, 22, 1, ((this.width - 22) / 2), -1);

       /*
       this.divUp = document.createElement("div");
       this.divUp.style.background = "red";
       this.divUp.style.width = 22 + "px";
       this.divUp.style.height = 1 + "px";
       this.divUp.style.position = "absolute"; //wrapper의 자식
       this.divUp.style.left = ((this.width - parseInt(this.divUp.style.width)) / 2) + "px";
       this.divUp.style.top = -(parseInt(this.divUp.style.height)) + "px";
       this.wrapper.appendChild(this.divUp);
       */

        //우측 센서
        this.sensorArray[2] = new Sensor(this.wrapper, 1, 22, this.width, ((this.height - 22) / 2));

        /*
        this.divRight = document.createElement("div");
        this.divRight.style.background = "red";
        this.divRight.style.width = 1 + "px";
        this.divRight.style.height = 22 + "px";
        this.divRight.style.position = "absolute"; //wrapper의 자식
        this.divRight.style.left = this.width + "px";
        this.divRight.style.top = ((this.height - parseInt(this.divRight.style.height)) / 2) + "px";
        this.wrapper.appendChild(this.divRight);
        */

        //아래쪽 센서
        this.sensorArray[3] = new Sensor(this.wrapper, 22, 1, ((this.width - 22) / 2), this.height);

        /*
        this.divDown = document.createElement("div");
        this.divDown.style.background = "red";
        this.divDown.style.width = 22 + "px";
        this.divDown.style.height = 1 + "px";
        this.divDown.style.position = "absolute"; //wrapper의 자식
        this.divDown.style.left = ((this.width - parseInt(this.divDown.style.width)) / 2) + "px";
        this.divDown.style.top = this.height + "px";
        this.wrapper.appendChild(this.divDown);
        */
        /*
        //생성된 4개의 센서를 배열에 넣음
        this.sensorArray[0] = this.divLeft; //좌
        this.sensorArray[1] = this.divUp; //위
        this.sensorArray[2] = this.divRight; //우
        this.sensorArray[3] = this.divDown; //아래
        */
    }

    setSensor(){
        //모든 센서는 마리오의 x,y를 기준으로 변경되어야 하므로.
        this.sensorArray[0].x=this.x-1;
        this.sensorArray[1].x=this.x+(this.width - 22) / 2;
        this.sensorArray[2].x=this.x+this.width;
        this.sensorArray[3].x=this.x+(this.width - 22) / 2;

        this.sensorArray[0].y=this.y+(this.height - 22) / 2;
        this.sensorArray[1].y=this.y-1;
        this.sensorArray[2].y=this.y+(this.height - 22) / 2;
        this.sensorArray[3].y=this.y+this.height;

    }
    
    //부모의 메서드가 마리오에 적용하기엔 무리가 있으므로, 업그레이드하여 상황에 맞게 코드를 변경 (오버라이딩)
    //물리값 변화
    tick(){
        this.x += this.velX;
        this.y += this.velY;
        
        //마리오는 자신의 x가 변하면 본인이 보윺한 센서의 위치값도 갱신시킬 의무가 있음
        this.setSensor();

    }
    //그래픽 처리(화면에 반영)
    render() {
        this.wrapper.style.left = this.x + "px";
        this.wrapper.style.top = this.y + "px";
    }

}