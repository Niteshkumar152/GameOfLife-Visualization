 const row=40;
    const col=40;
    let count=0;
    
    const btn=document.querySelector(".btn1");
    const btn2=document.querySelector(".btn2");
    btn.addEventListener("click",startAlgo);
    btn2.addEventListener("click",stopAlgo);

    const generation = document.querySelector('.generation');

    let grid=createGrid(row,col);// random 0,1 grid
    let canvasUI=createCanvas(); //add div element and box class
    let gridUI=createUIGrid(canvasUI,grid);
    let resVec=Array(row)
        .fill()
        .map(()=>Array(col).fill(0));


    function isSafe(i, j, n, m)
    {
        if(i<0||j<0||i>=n||j>=m)
            return false;
        return true;
    }
    
    function dieOrLive( i, j, n, m,board)
    {
        
        const xNbr = [-1,-1,0,1,1,1,0,-1]; 
        const yNbr = [0,1,1,1,0,-1,-1,-1]; 
        let l=0;
        for(let k=0;k<8;k++){
            let x=i+xNbr[k];
            let y=j+yNbr[k];
            if(isSafe(x,y,n,m)==1){
                if(board[x][y]==1)
                    l++;
                
            }
        }
        return l;
    }

    let flag=false;
    function stopAlgo(){
       flag=true;
    }
   
    function startAlgo(){
    let interval=setInterval(()=>{

        const n=row;
        const m=col;
        for(let i=0;i<n;i++){
            for(let j=0;j<m;j++){
                
                let l=dieOrLive(i,j,n,m,grid);
                
                if(grid[i][j]==1){
                    
                    if(l<2){
                        resVec[i][j]=0;
                    }else if(l==2||l==3){
                        resVec[i][j]=1;
                    }else if(l>3){
                        resVec[i][j]=0;
                    }
                }else{
                    if(l==3){
                        resVec[i][j]=1;
                    }
                }
                
            }
            
        }

           
      for(let i=0;i<n;i++){
          for(let j=0;j<m;j++){
              grid[i][j]=resVec[i][j];
          }
      }
        

       //grid ,gridUI
      
    createUIGrid(gridUI,grid)
    count++;
    generation.textContent=count;
   
    if(flag===true){
        clearInterval(interval);
        flag=false;
    }

    } , 1000);

}

    function createUIGrid(canvasGrid,grid){
        //Adding color property to canvasGrid where grid[i][j]=1;
    for(let i=0;i<row;i++){
        for(let j=0;j<col;j++){
            if(grid[i][j]===1){
                canvasGrid[i][j].classList.add("box-color");
            }else{
                canvasGrid[i][j].classList.remove("box-color");
            }
                }
            } 
        return canvasGrid;
    }
   


    function createCanvas(){
        const mainCanvas=document.querySelector('.grid');
        for(let i=0;i<row;i++){
        for(let j=0;j<col;j++){
           const div=document.createElement('div');
           div.classList.add("box");
           mainCanvas.appendChild(div);
        }
      }
        // Nodelist with box class
        const canvas=document.querySelectorAll(".box");
        // Nodelist to arr
        const canvasArr=[...canvas];
        //create canvasGrid
        let canvasGrid=createGrid(row,col);
        
        //adding div box class to canvasGrid
        let cnt=0;
        let iRow=0,jCol=0;
        for(let i=0;i<canvasArr.length;i++){
            if(cnt==40){
            jCol=0;
            iRow++;
            cnt=0;
            }
            canvasGrid[iRow][jCol]=canvasArr[i];
            jCol++;
            cnt++;
        }

        return canvasGrid;
    }

    

    function createGrid(row,col){
        let grid=Array(row)
        .fill()
        .map(()=>Array(col).fill(0))

        fillGrid(grid); //fill with grid Randomly with 0,1(random)

        return grid;
    }

    function fillGrid(grid){
        for(let i=0;i<row;i++){
        for(let j=0;j<col;j++){
            const gridVal=Math.floor(Math.random()*2);
            if(gridVal===1){
                grid[i][j]=1;
            }
        }
    } 
}
