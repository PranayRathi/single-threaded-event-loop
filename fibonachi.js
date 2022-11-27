const getFibonachiNo = (num) => {

    if(num == 0) return 0;

    if(num == 1) return 1;

    return getFibonachiNo(num-1) + getFibonachiNo(num-2);
}

exports.getFibonachiNo = getFibonachiNo