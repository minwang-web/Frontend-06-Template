
//练习：用 JavaScript 去设计狗咬人的代码
class Human{
    constructor(name, liveValue = 100){
        this.name = name;
        this.liveValue = liveValue;//生命值
        this.isAlive = this.liveValue > 0;
    }
    hurt(damage){
        if(this.isAlive){
            this.liveValue = this.liveValue > damage ? this.liveValue - damage : 0;
            this.isAlive = this.liveValue > 0;
        }

        if(this.isAlive){
            return this.name  + "的生命值:" + this.liveValue
        }else{
            return this.name + '战败! 恶狗获胜'
        }
    }
}

class Dog{
    constructor(name, damage = 10){
        this.name = name;
        this.damage = damage;
    }
    bite(){
        return this.damage;
    }
}

var human = new Human('Min');
var smallDog = new Dog('smallDog');

console.log(human.hurt(smallDog.bite()));