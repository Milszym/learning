const fs=require("fs");const strip=s=>s.replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
for(const f of process.argv.slice(2)){const h=fs.readFileSync(f,"utf8");let cfg;global.document={getElementById:()=>({})};global.Quiz={mount:(_,c)=>cfg=c};
[...h.matchAll(/<script>([\s\S]*?)<\/script>/g)].forEach(m=>eval(m[1]));console.log("## "+f.split("/").pop());
cfg.questions.forEach((q,i)=>console.log(`${i+1}. ${strip(q.prompt)}\n   => ${q.accept?"TYPE "+JSON.stringify(q.accept):q.options.map((o,j)=>(j===q.answer?"*":"")+o).join(" | ")}`));}
