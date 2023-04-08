// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;
/**
* 根据ERC20合约  实现一个代币发行合约
*/

interface IERC20 {

  // 当前合约总量
  function totalSupply() external view returns (uint256);

  // “account” 账户的余额
  function balanceOf(address account) external view returns (uint256);

  // 把当前的余额由调用者发送到 另一个账户
  function transfer(address recipient, uint256 amount) external returns (bool);

  //  当前账户对目标账户授权额度
  function allowance(address owner, address spender) external view returns (uint256);

  // 授权
  function approve(address spender, uint256 amount) external returns (bool);

  function transferFrom(
      address sender,
      address recipient,
      uint256 amount
    ) external returns (bool);

  // 转账
  event Transfer(address indexed from, address indexed to, uint256 value);
  // 授权
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

// 合约逻辑实现
contract ERC20 is IERC20 {
  uint public totalSupply;
  mapping(address => uint) public balanceOf;
  // 授权额度
  mapping(address => mapping(address => uint)) public allowance;
  // 代币名称
  string public name;
  // 简写
  string public symbol;
  uint8 public decimals = 18;//精度
  
  constructor(string memory name_, string memory symbol_){
      name = name_;
      symbol = symbol_;
  }

    // recipient 接受者
  function transfer(address recipient, uint256 amount) external returns (bool){
      // 发送方法
      // 本账户 减掉金额
      balanceOf[msg.sender] -= amount;
      // 目标账户 增加金额
      balanceOf[recipient] += amount;
      // 触发事件
      emit Transfer(msg.sender, recipient, amount);
      return true;
    }

  // 批准 授权额度 (spender 是被授权的账户)
  function approve(address spender, uint256 amount) external returns (bool){
      allowance[msg.sender][spender] = amount;
      emit Approval(msg.sender, spender, amount);
      return true;
    }

  function transferFrom(
      address sender,
      address recipient,
      uint256 amount
    ) external returns (bool){
      allowance[sender][msg.sender] -= amount;
      balanceOf[sender] -= amount;
      balanceOf[recipient] += amount;
      emit Transfer(sender, recipient, amount);
      return true;
    }

  // 铸造
  function mint(uint amount) external{
      balanceOf[msg.sender] += amount;
      totalSupply += amount;
      emit Transfer(address(0), msg.sender, amount);
    }

  // 销毁
  function burn(uint amount) external {
      balanceOf[msg.sender] -= amount;
      totalSupply -= amount;
      emit Transfer(msg.sender, address(0), amount);
    }
}