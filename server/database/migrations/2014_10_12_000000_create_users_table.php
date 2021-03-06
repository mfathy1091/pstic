<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('type');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            // $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            // $table->mediumText('bio')->nullable();
            $table->string('photo')->default('profile.png');
            $table->boolean('is_active')->default(1);
            $table->unsignedBigInteger('budget_id');
            $table->unsignedBigInteger('direct_manager_id')->nullable();
            $table->date('hire_date')->nullable();
            $table->rememberToken();
            $table->timestamps();

            $table->foreign('budget_id')->references('id')->on('budgets');
            $table->foreign('direct_manager_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
