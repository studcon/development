<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Output\OutputInterface;

class ResetDBAndRestart extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:reset-db-serve';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cleans and reseeds db, then restarts the server';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->call("migrate:fresh", []);
        $this->call("db:seed", []);
        $this->call("serve", []);
    }
}
