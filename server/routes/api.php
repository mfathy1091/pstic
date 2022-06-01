<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Unprotected Routes
Route::post('/auth/login', 'App\Http\Controllers\AuthController@login');

// Protected Routes
Route::group(['middleware' => ['auth:sanctum'], 'namespace' => 'App\Http\Controllers'], function () {
    Route::post('/auth/logout', 'AuthController@logout');
    Route::get('/auth/user', 'AuthController@getAuthenticatedUser');


    Route::apiResources(['roles'=> 'RoleController']);
    Route::apiResources(['permission'=> 'PermissionController']);
    Route::apiResources(['nationalities'=> 'NationalityController']);
    Route::apiResources(['relationships'=> 'RelationshipController']);
    Route::apiResources(['referral_reasons'=> 'ReasonController']);
    Route::apiResources(['service-types'=> 'ServiceTypeController']);
    Route::apiResources(['disabilities'=> 'DisabilityController']);
    Route::apiResources(['budgets'=> 'BudgetController']);
    Route::apiResources(['areas'=> 'AreaController']);
    Route::apiResources(['departments'=> 'DepartmentController']);

    // statuses
    Route::get('housing-grant-statuses', 'StatusController@getHousingGrantStatuses');
    Route::get('beneficiary-statuses', 'StatusController@getBeneficiaryStatuses');

    // Provided Services
    Route::get('provided-services', 'ProvidedServiceController@index');

    
    // Casees
    Route::get('casees/{id}/referrals', 'CaseeController@getReferrals')->where('id', '[0-9]+');
    Route::get('casees/create_or_get', 'CaseeController@createOrGetCasee');
    Route::get('casees/search', 'CaseeController@search');
    Route::get('casees', 'CaseeController@index');
    Route::post('casees', 'CaseeController@store');
    Route::get('casees/{id}', 'CaseeController@show')->where('id', '[0-9]+');
    Route::put('casees/{id}', 'CaseeController@update')->where('id', '[0-9]+');
    Route::get('casees/exists/{n}', 'CaseeController@exists');
    
    // PS Intakes
    Route::get('ps-intakes/monthly-counts-by-statuses', 'PsIntakeController@getMonthlyCountsByStatuses');
    Route::get('ps-intakes', 'PsIntakeController@index');
    Route::post('ps-intakes', 'PsIntakeController@store');
    Route::get('ps-intakes/{id}', 'PsIntakeController@show')->where('id', '[0-9]+');
    Route::put('ps-intakes/{id}', 'PsIntakeController@update')->where('id', '[0-9]+');

    // PSS Referrals
    Route::get('referrals/monthly', 'ReferralController@getMonthlyReferrals');
    Route::get('beneficiaries/monthly_referral_beneficiaries', 'BeneficiaryController@getMonthlyReferralBeneficiaries');

    Route::get('referrals/currentMonth', 'ReferralController@getCurrentMonthReferrals');
    Route::get('referrals/activeCount', 'ReferralController@getActiveCount');
    Route::put('referrals/{id}/close', 'ReferralController@closeReferral');
    Route::get('beneficiaries/{individual}/referrals', 'ReferralController@getIndividualReferrals');
    Route::get('referrals/getIndividualReferrals', 'ReferralController@getIndividualReferrals');
    Route::get('referrals', 'ReferralController@index')->where('id', '[0-9]+');
    Route::get('referrals/{id}', 'ReferralController@show')->where('id', '[0-9]+');

    // Housing Referrals
    Route::get('casees/{casee}/housing-referrals', 'HousingReferralController@getCaseeHousingReferrals');
    Route::get('current-housing-advocate/housing-referrals', 'HousingReferralController@getCurrentHousingAdvocateHousingReferrals');
    Route::post('housing-referrals/', 'HousingReferralController@store');
    Route::put('housing-referrals/{id}', 'HousingReferralController@update');
    Route::get('casees/{casee}/housing-referrals', 'HousingReferralController@getCaseeHousingReferrals');

    // Records
    Route::get('referrals/{referral_id}/latest-record', 'RecordController@latestReferralRecord');
    Route::put('records/{record}', 'RecordController@update');
    Route::get('records/search', 'RecordController@search');
    Route::get('records/{record}', 'RecordController@show');
   
    // beneficiaries stats
    Route::get('beneficiaries/services/', 'BeneficiaryController@beneficiariesServices');
    Route::get('ps/beneficiaries/', 'BeneficiaryController@psBeneficiaries');

    // beneficiaries
    Route::get('beneficiaries/search/', 'BeneficiaryController@search');
    Route::get('beneficiaries/searchBeneficiaries/', 'BeneficiaryController@searchBeneficiaries');
    Route::put('beneficiaries/{individual}/deactivate', 'BeneficiaryController@deactivateBeneficiary');
    Route::put('beneficiaries/{individual}/activate', 'BeneficiaryController@activateBeneficiary');
    Route::apiResources(['beneficiaries'=> 'BeneficiaryController']);
    Route::get('beneficiaries/get/{caseeId}', 'BeneficiaryController@getbeneficiaries');
    Route::get('beneficiaries/{individual}/other_casee_beneficiaries', 'BeneficiaryController@getOtherCaseebeneficiaries');
    Route::get('passport_beneficiaries/get_individual_by_passport/{passport_number}', 'Individual\PassportBeneficiaryController@getIndividualByPassword');
    Route::get('casees/{casee}/beneficiaries', 'BeneficiaryController@getCaseeBeneficiaries');
    
    // Referral Beneficiaries
    Route::get('referral-beneficiaries/', 'ReferralBeneficiaryController@index');
    Route::get('referral-beneficiaries/search', 'ReferralBeneficiaryController@search');
    Route::get('referral-beneficiaries/stats/', 'ReferralBeneficiaryController@getStats');

    // Record Beneficiaries
    // Route::apiResources(['record-beneficiaries'=> 'RecordBeneficiaryController']);
    Route::put('record-beneficiaries/{id}', 'RecordBeneficiaryController@update');
    Route::get('records/{record}/record-beneficiaries', 'Record\RecordBeneficiaryController@index');

    
    Route::get('abilities', 'AbilityController@index');
    Route::get('ability/{id}', 'AbilityController@show');
    Route::post('ability', 'AbilityController@store');
    Route::put('ability', 'AbilityController@update');
    Route::delete('ability/{id}', 'AbilityController@destroy');


    Route::get('manager-team-members', 'UserController@managerTeamMembers');
    Route::apiResources(['users'=> 'UserController']);
    Route::apiResources(['referral_sources'=> 'ReferralSourceController']);

    Route::get('activities', 'ActivityController@index');
    Route::post('activities', 'ActivityController@store');
    Route::put('activities/{id}', 'ActivityController@update');
    Route::delete('activities/{id}', 'ActivityController@destroy');

    // Emergencies
    Route::get('emergencies', 'EmergencyController@index');
    Route::post('emergencies', 'EmergencyController@store');
    Route::put('emergencies/{id}', 'EmergencyController@update');
    Route::delete('emergencies/{id}', 'EmergencyController@destroy');

    // Emergency types
    Route::get('emergency-types', 'EmergencyTypeController@index');


    // Test
    Route::get('test', 'TestController@index');

    Route::get('months', 'MonthController@index');
    Route::get('months/current', 'MonthController@currentMonth');

});

Route::group(['middleware' => ['auth.gates']], function () {
    // Route::apiResources(['referral_sources'=> 'ReferralSourceController']);
});

