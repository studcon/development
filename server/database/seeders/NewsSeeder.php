<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('news')->insert([
            [
                'title' => 'Новость 1',
                'content' => 'Описание новости: Глобальная Новость 1',
                'group_id' => null,
            ],
            [
                'title' => 'Новость 2',
                'content' => 'Описание новости: Новость для группы с id 1',
                'group_id' => 1,
            ],
            [
                'title' => 'Новость 3',
                'content' => 'Описание новости: Новость для группы с id 2',
                'group_id' => 2,
            ],
        ]);
    }
}
