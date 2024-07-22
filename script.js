document.getElementById('predictionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const job = document.getElementById('job').value;
    
    fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ job: job })
    })
    .then(response => response.json())
    .then(data => {
        let resultHTML = '<h2>Predictions:</h2><table class="table">';
        const Diment = [];
        const ValDiment = [];
        let i = 0;
        for (let key in data) {
            
            Diment[i] = `${key}`;
            ValDiment[i] = `${data[key].toFixed(2)}`;
            switch (i) {
                case 0:
                    let t1 = Absenteeism(ValDiment[i]);
                    ValDiment[i] = t1;
                break;
                case 1:
                    let t2 = Attendance(ValDiment[i]);
                    ValDiment[i] = t2;
                break;
                case 2:
                    let t3 = Discipline(ValDiment[i]);
                    ValDiment[i] = t3;
                break;
                case 3:
                    let t4 = Evaluations(ValDiment[i]);
                    ValDiment[i] = t4;
                break;
                case 4:
                    let t5 = Innovation(ValDiment[i]);
                    ValDiment[i] = t5;
                break;
                case 5:
                    let t6 = Lateness(ValDiment[i]);
                    ValDiment[i] = t6;
                break;
                case 6:
                    let t7 = Penalties(ValDiment[i]);
                    ValDiment[i] = t7;
                break;
                case 7:
                    let t8 = ProblemSolving(ValDiment[i]);
                    ValDiment[i] = t8;
                break;
                case 8:
                    let t9 = Productivity(ValDiment[i]);
                    ValDiment[i] = t9;
                break;
                case 9:
                    let t10 = WorkCompletionTime(ValDiment[i]);
                    ValDiment[i] = t10;
                break;
                case 10:
                    let t11 = WorkQuality(ValDiment[i]);
                    ValDiment[i] = t11;
                break;
            }
            
            console.log(Diment[i]);console.log(ValDiment[i]);
            resultHTML += `<tr><td>${key}</td><td>${data[key].toFixed(2)}</td><td>`+diff(job, i, `${data[key].toFixed(2)}`)+`</td><td>`+ValDiment[i]+`</td></tr>`;
            i++;
        }
        
        document.getElementById('results').innerHTML = resultHTML;
    })
    .catch(error => console.error('Error:', error));
});


function Absenteeism(val){
    val = Number(val);
    return (val/0.0054).toFixed(0)+' Days/Year.';
}

function Attendance(val){
    val = Number(val);
    if(val >= 0 && val < 0.26){
        return 'Bad';
    }
    if(val >= 0.26 && val < 0.51){
        return 'Medium';
    }
    if(val >= 0.51 && val < 0.76){
        return 'Good';
    }
    if(val >= 0.76 && val <= 1){
        return 'Excellent';
    }
}

function Discipline(val){
    val = Number(val);
    if(val >= 0 && val < 0.26){
        return 'Bad';
    }
    if(val >= 0.26 && val < 0.51){
        return 'Medium';
    }
    if(val >= 0.51 && val < 0.76){
        return 'Good';
    }
    if(val >= 0.76 && val <= 1){
        return 'Excellent';
    }
}

function Evaluations(val){
    val = Number(val);
    if(val >= 0 && val < 0.26){
        return 'Bad';
    }
    if(val >= 0.26 && val < 0.51){
        return 'Medium';
    }
    if(val >= 0.51 && val < 0.76){
        return 'Good';
    }
    if(val >= 0.76 && val <= 1){
        return 'Excellent';
    }
}

function Innovation(val){
    val = Number(val);
    return (val/0.01).toFixed(0)+' Suggestion.';
}

function Lateness(val){
    val = Number(val);
    return (val/0.0054).toFixed(0)+' Days/Year.';
}

function Penalties(val){
    val = Number(val);
    return (val/0.0054).toFixed(0)+' Penalties.';
}

function ProblemSolving(val){
    val = Number(val);
    return (val/0.01).toFixed(0)+' Solutions.';
}

function Productivity(val){
    val = Number(val);
    if(val >= 0 && val < 0.26){
        return 'Bad';
    }
    if(val >= 0.26 && val < 0.51){
        return 'Medium';
    }
    if(val >= 0.51 && val < 0.76){
        return 'Good';
    }
    if(val >= 0.76 && val <= 1){
        return 'Excellent';
    }
}

function WorkCompletionTime(val){
    val = Number(val);
    if(val >= 0 && val < 0.26){
        return 'Bad';
    }
    if(val >= 0.26 && val < 0.51){
        return 'Medium';
    }
    if(val >= 0.51 && val < 0.76){
        return 'Good';
    }
    if(val >= 0.76 && val <= 1){
        return 'Excellent';
    }
}

function WorkQuality(val){
    val = Number(val);
    if(val >= 0 && val < 0.26){
        return 'Bad';
    }
    if(val >= 0.26 && val < 0.51){
        return 'Medium';
    }
    if(val >= 0.51 && val < 0.76){
        return 'Good';
    }
    if(val >= 0.76 && val <= 1){
        return 'Excellent';
    }
}

function diff(job,index, pred){
    const job0 = [0.03, 0.90, 0.95, 0.91, 0.15, 0.04, 0.02, 0.05, 0.96, 0.95, 0.94];
    const job1 = [0.05, 0.90, 0.97, 0.89, 0.10, 0.05, 0.05, 0.07, 0.91, 0.96, 0.94];
    const job2  = [0.04, 0.86, 0.95, 0.85, 0.05, 0.05, 0.03, 0.02, 0.85, 0.90, 0.95];
    const job3 = [0.05, 0.84, 0.94, 0.80, 0.04, 0.05, 0.05, 0.04, 0.79, 0.94, 0.91];
    const job4 = [0.06, 0.85, 0.95, 0.81, 0.04, 0.05, 0.05, 0.03, 0.83, 0.95, 0.90];
    const job5 = [0.05, 0.85, 0.95, 0.82, 0.04, 0.06, 0.05, 0.04, 0.79, 0.95, 0.92];
    const job6 = [0.05, 0.81, 0.94, 0.85, 0.04, 0.07, 0.05, 0.02, 0.81, 0.90, 0.80];
    const job7 = [0.01, 0.96, 0.99, 0.99, 0.99, 0.02, 0.00, 0.99, 0.98, 0.96, 0.98];
    const job8 = [0.05, 0.84, 0.94, 0.82, 0.04, 0.05, 0.05, 0.03, 0.82, 0.95, 0.91];
    const job9 = [0.05, 0.72, 0.89, 0.80, 0.02, 0.07, 0.05, 0.02, 0.71, 0.90, 0.85];
    const job10 = [0.02, 0.95, 0.98, 0.95, 0.07, 0.02, 0.02, 0.21, 0.96, 0.99, 0.97];
    const job11 = [0.05, 0.73, 0.95, 0.77, 0.02, 0.05, 0.05, 0.03, 0.72, 0.90, 0.92];
    const job12 = [0.05, 0.84, 0.94, 0.82, 0.11, 0.06, 0.05, 0.07, 0.85, 0.94, 0.94];
    const job13 = [0.05, 0.85, 0.94, 0.84, 0.11, 0.04, 0.05, 0.06, 0.84, 0.94, 0.94];
    const job14 = [0.01, 0.97, 0.96, 0.96, 0.97, 0.04, 0.02, 0.98, 0.97, 0.97, 0.96];
    const job15 = [0.04, 0.89, 0.91, 0.90, 0.06, 0.05, 0.03, 0.17, 0.92, 0.94, 0.90];
    const job16  = [0.10, 0.73, 0.84, 0.79, 0.03, 0.08, 0.05, 0.03, 0.70, 0.94, 0.83];
    const job17 = [0.10, 0.72, 0.86, 0.77, 0.02, 0.07, 0.05, 0.02, 0.71, 0.93, 0.84];
    const job18 = [0.03, 0.94, 0.95, 0.90, 0.18, 0.03, 0.04, 0.62, 0.90, 0.96, 0.89];
    const job19 = [0.10, 0.73, 0.85, 0.77, 0.03, 0.07, 0.05, 0.02, 0.70, 0.93, 0.83];
    const job20 = [0.05, 0.83, 0.95, 0.82, 0.20, 0.03, 0.04, 0.10, 0.84, 0.93, 0.94];
    const job21 = [0.02, 0.96, 0.97, 0.96, 0.95, 0.02, 0.04, 0.97, 0.93, 0.96, 0.96];
    const job22 = [0.02, 0.95, 0.96, 0.97, 0.96, 0.02, 0.05, 0.97, 0.95, 0.98, 0.96];
    const job23 = [0.04, 0.89, 0.94, 0.91, 0.20, 0.04, 0.05, 0.27, 0.90, 0.95, 0.94];
    const job24 = [0.10, 0.72, 0.84, 0.78, 0.03, 0.08, 0.05, 0.02, 0.71, 0.93, 0.84];
    const job25 = [0.03, 0.96, 0.98, 0.96, 0.97, 0.01, 0.24, 0.96, 0.97, 0.98, 0.96];
    const job26 = [0.05, 0.78, 0.93, 0.84, 0.05, 0.08, 0.06, 0.12, 0.84, 0.88, 0.81];
    const job27 = [0.11, 0.74, 0.85, 0.78, 0.02, 0.07, 0.05, 0.02, 0.70, 0.93, 0.83];
    const job28 = [0.04, 0.88, 0.94, 0.89, 0.06, 0.06, 0.04, 0.06, 0.89, 0.92, 0.95];
    const job29  = [0.04, 0.89, 0.94, 0.90, 0.14, 0.05, 0.03, 0.06, 0.90, 0.94, 0.90];
    const job30 = [0.01, 0.96, 0.95, 0.96, 0.97, 0.01, 0.16, 0.96, 0.94, 0.97, 0.94];
    const job31 = [0.03, 0.95, 0.98, 0.96, 0.94, 0.03, 0.02, 0.96, 0.97, 0.97, 0.95];
    const job32 = [0.04, 0.90, 0.94, 0.90, 0.16, 0.04, 0.03, 0.06, 0.90, 0.93, 0.90];
    const job33 = [0.10, 0.73, 0.85, 0.78, 0.03, 0.08, 0.05, 0.03, 0.70, 0.93, 0.83];
    const job34 = [0.02, 0.95, 0.96, 0.96, 0.95, 0.03, 0.03, 0.96, 0.95, 0.96, 0.95];
    const job35 = [0.03, 0.95, 0.94, 0.95, 0.95, 0.04, 0.04, 0.95, 0.95, 0.94, 0.95];
    const job36 = [0.02, 0.95, 0.94, 0.94, 0.94, 0.02, 0.03, 0.06, 0.89, 0.94, 0.95];
    const job37 = [0.05, 0.82, 0.87, 0.78, 0.13, 0.05, 0.07, 0.05, 0.82, 0.90, 0.76];
    const job38  = [0.05, 0.73, 0.94, 0.74, 0.05, 0.07, 0.06, 0.05, 0.86, 0.79, 0.90];
    switch (job){
        case 'Accountant' :  
            return SetStyle((pred - Number(job0[index])).toFixed(2));
        break;
        case 'Administrative Officer' :  
            return SetStyle((pred - Number(job1[index])).toFixed(2));
        break;
        case 'Aide Cook' :  
            return SetStyle((pred - Number(job2[index])).toFixed(2));
        break;
        case 'Baker' :  
            return SetStyle((pred - Number(job3[index])).toFixed(2));
        break;
        case 'Butcher' :  
            return SetStyle((pred - Number(job4[index])).toFixed(2));
        break;
        case 'Carpenter' :  
            return SetStyle((pred - Number(job5[index])).toFixed(2));
        break;
        case 'Chambermaid' :  
            return SetStyle((pred - Number(job6[index])).toFixed(2));
        break;
        case 'Chief Executive Officer (CEO)' :  
            return SetStyle((pred - Number(job7[index])).toFixed(2));
        break;
        case 'Cook' :  
            return SetStyle((pred - Number(job8[index])).toFixed(2));
        break;
        case 'Dishwasher' :  
            return SetStyle((pred - Number(job9[index])).toFixed(2));
        break;
        case 'Doctor' :  
            return SetStyle((pred - Number(job10[index])).toFixed(2));
        break;
        case 'Driver' :  
            return SetStyle((pred - Number(job11[index])).toFixed(2));
        break;
        case 'Electrician' :  
            return SetStyle((pred - Number(job12[index])).toFixed(2));
        break;
        case 'Electro Mechanic' :  
            return SetStyle((pred - Number(job13[index])).toFixed(2));
        break;
        case 'Finance and Accounting Manager' :  
            return SetStyle((pred - Number(job14[index])).toFixed(2));
        break;
        case 'Financial Officer' :  
            return SetStyle((pred - Number(job15[index])).toFixed(2));
        break;
        case 'Gardener ' :  
            return SetStyle((pred - Number(job16[index])).toFixed(2));
        break;
        case 'Handler' :  
            return SetStyle((pred - Number(job17[index])).toFixed(2));
        break;
        case 'Head Chef' :  
            return SetStyle((pred - Number(job18[index])).toFixed(2));
        break;
        case 'Housekeeper' :  
            return SetStyle((pred - Number(job19[index])).toFixed(2));
        break;
        case 'Housekeeping Supervisor' :  
            return SetStyle((pred - Number(job20[index])).toFixed(2));
        break;
        case 'HR Manager' :  
            return SetStyle((pred - Number(job21[index])).toFixed(2));
        break;
        case 'IT Manager' :  
            return SetStyle((pred - Number(job22[index])).toFixed(2));
        break;
        case 'IT Technician' :  
            return SetStyle((pred - Number(job23[index])).toFixed(2));
        break;
        case 'Laundress' :  
            return SetStyle((pred - Number(job24[index])).toFixed(2));
        break;
        case 'Management Manager' :  
            return SetStyle((pred - Number(job25[index])).toFixed(2));
        break;
        case 'Mechanic' :  
            return SetStyle((pred - Number(job26[index])).toFixed(2));
        break;
        case 'Multitask Agent' :  
            return SetStyle((pred - Number(job27[index])).toFixed(2));
        break;
        case 'Nurse' :  
            return SetStyle((pred - Number(job28[index])).toFixed(2));
        break;
        case 'Pastry Chef' :  
            return SetStyle((pred - Number(job29[index])).toFixed(2));
        break;
        case 'Procurement Manager' :  
            return SetStyle((pred - Number(job30[index])).toFixed(2));
        break;
        case 'QHSE Manager' :  
            return SetStyle((pred - Number(job31[index])).toFixed(2));
        break;
        case 'Section Chef' :  
            return SetStyle((pred - Number(job32[index])).toFixed(2));
        break;
        case 'Security Guard' :  
            return SetStyle((pred - Number(job33[index])).toFixed(2));
        break;
        case 'Site Supervisor' :  
            return SetStyle((pred - Number(job34[index])).toFixed(2));
        break;
        case 'Steward' :  
            return SetStyle((pred - Number(job35[index])).toFixed(2));
        break;
        case 'Veterinarian' :  
            return SetStyle((pred - Number(job36[index])).toFixed(2));
        break;
        case 'Waiter' :  
            return SetStyle((pred - Number(job37[index])).toFixed(2));
        break;
        case 'Warehouse Manager ' :  
            return SetStyle((pred - Number(job38[index])).toFixed(2));
        break;
    }
}


function SetStyle(val){
    val = Number(val);
    if(val > 0){
        return '<span class="green"><b>+'+val+'</b></span>';
    }
    if(val == 0){
        return '<b>'+val+'</b>';
    }
    if(val < 0){
        return '<span class="red"><b>'+val+'</b></span>';
    }
    
}
 