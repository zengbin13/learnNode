module.exports = {
  gameLogic(playerAction) {
    if (['rock', 'scissors', 'paper'].indexOf(playerAction) === -1) {
      throw new Error('invalid playerAction');
    }
    // 电脑
    let computerAction;
    let random = Math.random() * 3;
    if (random < 1) {
      computerAction = 'rock';
    } else if (random < 2) {
      computerAction = 'scissors';
    } else {
      computerAction = 'paper';
    }
    if (playerAction === computerAction) {
      return 0;
    }
    if (
      (playerAction === 'rock' && computerAction === 'scissors') ||
      (playerAction === 'scissors' && computerAction === 'paper') ||
      (playerAction === 'paper' && computerAction === 'rock')
    ) {
      return 1;
    } else {
      return -1;
    }
  },
};
