const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

async function fixOptions() {
  try {
    // packages/services 디렉토리의 모든 .ts 파일 찾기
    const files = await glob('packages/services/**/*.ts', { 
      cwd: process.cwd(),
      absolute: true 
    });

    console.log(`Found ${files.length} files to process...`);

    let totalChanges = 0;

    for (const filePath of files) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // options)를 options as any)로 변경
      const updatedContent = content.replace(/options\)/g, 'options as any)');
      
      if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        const changes = (content.match(/options\)/g) || []).length;
        totalChanges += changes;
        console.log(`✅ Updated ${filePath}: ${changes} changes`);
      }
    }

    console.log(`🎉 Total changes made: ${totalChanges}`);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixOptions();
