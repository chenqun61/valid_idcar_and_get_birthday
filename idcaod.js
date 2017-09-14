validateIdCard(idCard) { //身份证校验
    let regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
            let idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
            let idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            let idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
            for (var i = 0; i < 17; i++) {
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
            }

            let idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
            let idCardLast = idCard.substring(17);//得到最后一位身份证号码

            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod == 2) {
                if (idCardLast == "X" || idCardLast == "x") {
                    console.log("身份证通过验证啦！");
                    return true;
                } else {
                    console.log("身份证号码错误！");
                    return false;
                }
            } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast == idCardY[idCardMod]) {
                    console.log("身份证通过验证啦！");
                    return true;
                } else {
                    console.log("身份证号码错误！");
                    return false;
                }
            }
        }
    } else {
        console.log("身份证格式不正确!");
        return false;
    }
}
// 根据身份证号码获取生日
var getBirthdayFromIdCard = function (idCard) {
    var birthday = '';
    idCard = idCard.toString();
    if (idCard != null && idCard != '') {
        if (idCard.length == 15) {
            birthday = "19" + idCard.substr(6, 6);
        } else if (idCard.length == 18) {
            birthday = idCard.substr(6, 8);
        }

        birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-');
    }

    return birthday;
}
console.log(getBirthdayFromIdCard(441825199208021017))  // 1992-08-02

