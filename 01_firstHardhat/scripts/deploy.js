const {ethers, run, network} = require("hardhat")

async function main(){
// 部署合约
  // 获取合约工厂
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying contract...")
  const simpleStorage = await SimpleStorageFactory.deploy()
  // 部署合约
  await simpleStorage.deployed()
  console.log(`部署的地址是 address:${simpleStorage.address}`)

// 验证合约
  // 获取当前的网络配置，是运行在本地还是在测试网
  console.log("运行的网络",network.config)
  if(network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY){
    // 部署到链上时有一定的延迟，所以等六个区块再运行
    console.log("要等待六个区块验证...")
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address,[])
  }

// 合约交互
  const currentValue = await simpleStorage.retrieve()
  console.log(`retrieve currentValue is:${currentValue}`)
  // 重新赋值并且获取到最新值
  const transactionResponse = await simpleStorage.store(8)
  await transactionResponse.wait(1)
  const newValue = await simpleStorage.retrieve()
  console.log(`retrieve newValue is:${newValue}`,)
}

async function verify(contractAddress,args){
  console.log("verifying contract验证合约...",contractAddress,args)
  try{
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e){
    if(e.message.toLowerCase().includes("already verified")){
      console.log("already verified")
    }else{
      console.log("验证出错了：",e)
    }
  }
}

main()
  	.then(()=>process.exit(0))
  	.catch((error)=>{
      console.log(error)
      process.exit(1)
    })