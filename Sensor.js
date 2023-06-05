/*7) 센서 생성 클래스
우리가 개발한 충돌체크함수는 매개변수로 인스턴스를 원함
이유? 인스턴스는 width, height, x, y를 가질 수 있는 단위이기 때문에 
센서조차 인스턴스화시켜 width, height, x, y를 보유하게함
*/
//모든 센서들의 최상위 클래스 정의
class Sensor {
    constructor(container, width, height, x, y) {
        this.container=container;
        this.width=width;
        this.height=height;
        this.x=x;
        this.y=y;

        this.div = document.createElement("div");

        this.div.style.background = "red";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.position = "absolute"; //wrapper의 자식
        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";

        this.container.appendChild(this.div);
    }
}