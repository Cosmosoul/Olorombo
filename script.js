// 主入口文件 - 游戏初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('链式反应迷宫 v2.0 已加载');
    
    // 初始化所有系统
    // UI系统已在ui.js中自动初始化
    // 音频系统已在audio.js中自动初始化
    
    // 添加加载完成提示
    setTimeout(() => {
        console.log('所有系统初始化完成，游戏已就绪');
    }, 100);
    
    // 添加节拍闪烁效果（BPM=120，每拍0.5秒）
    setInterval(() => {
        // 为所有颜色方块添加闪烁效果
        const colorCells = document.querySelectorAll('.cell.color');
        colorCells.forEach(cell => {
            cell.style.animationPlayState = 'running';
            
            // 短暂高亮
            const originalBoxShadow = cell.style.boxShadow;
            cell.style.boxShadow = originalBoxShadow + ', 0 0 20px rgba(255, 255, 255, 0.8)';
            
            setTimeout(() => {
                cell.style.boxShadow = originalBoxShadow;
            }, 100);
        });
    }, 500); // 每0.5秒一次
    
    // 添加方块呼吸效果（与节拍同步）
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        // 为每个方块设置不同的动画延迟，创建波浪效果
        cell.style.animationDelay = `${(index % 10) * 0.05}s`;
    });
});