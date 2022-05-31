<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Department;
use Illuminate\Support\Facades\DB;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [    
                'name' => 'PSS',
                'manager_id' => '1',
            ],
            [    
                'name' => 'Housing',
                'manager_id' => '1',
            ],
            [    
                'name' => 'Program',
                'manager_id' => '1',
            ],
        ];

        DB::table('departments')->insert($data);
        
    }
}
