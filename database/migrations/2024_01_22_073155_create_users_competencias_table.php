<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users_competencias', function (Blueprint $table) {

            $table->timestamps();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('competencia_id');
            $table->unsignedBigInteger('docente_validador');

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('competencia_id')->references('id')->on('competencias');
            $table->foreign('docente_validador')->references('id')->on('reconocimientos');

            $table->primary(['user_id', 'competencia_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void

    {
        Schema::dropIfExists('users_competencias');
    }
};
